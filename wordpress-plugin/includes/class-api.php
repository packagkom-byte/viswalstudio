<?php
/**
 * API Handler for AI Search
 */

class Viswalstudio_AI_Search_API {
    private static $instance = null;

    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('wp_ajax_viswalstudio_ai_search', array($this, 'handle_search'));
        add_action('wp_ajax_nopriv_viswalstudio_ai_search', array($this, 'handle_search'));
    }

    public function handle_search() {
        check_ajax_referer('viswalstudio_ai_search_nonce', 'nonce');

        $query = isset($_POST['query']) ? sanitize_text_field($_POST['query']) : '';

        if (empty($query)) {
            wp_send_json_error(array('message' => 'Query is required'));
        }

        $n8n_url = get_option('viswalstudio_ai_search_n8n_url', 'http://localhost:5678');
        $webhook_path = get_option('viswalstudio_ai_search_webhook_path', 'webhook/search');
        $endpoint = trailingslashit($n8n_url) . $webhook_path;

        $response = wp_remote_post($endpoint, array(
            'headers' => array('Content-Type' => 'application/json'),
            'body' => json_encode(array('query' => $query)),
            'timeout' => 15
        ));

        if (is_wp_error($response)) {
            wp_send_json_error(array('message' => $response->get_error_message()));
        }

        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);

        if (empty($data)) {
            wp_send_json_error(array('message' => 'Invalid response from AI service'));
        }

        wp_send_json_success($data);
    }
}
