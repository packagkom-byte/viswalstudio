<?php
/**
 * Settings page for Viswalstudio AI Search plugin
 */

class Viswalstudio_AI_Search_Settings {
    private static $instance = null;

    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('admin_menu', array($this, 'add_settings_page'));
        add_action('admin_init', array($this, 'register_settings'));
    }

    public function add_settings_page() {
        add_options_page(
            'Viswalstudio AI Search Settings',
            'AI Search',
            'manage_options',
            'viswalstudio-ai-search',
            array($this, 'render_settings_page')
        );
    }

    public function register_settings() {
        register_setting('viswalstudio_ai_search_options', 'viswalstudio_ai_search_n8n_url');
        register_setting('viswalstudio_ai_search_options', 'viswalstudio_ai_search_ollama_url');
        register_setting('viswalstudio_ai_search_options', 'viswalstudio_ai_search_webhook_path');

        add_settings_section(
            'viswalstudio_ai_search_main',
            'API Configuration',
            array($this, 'render_section_text'),
            'viswalstudio-ai-search'
        );

        add_settings_field(
            'viswalstudio_ai_search_n8n_url',
            'n8n URL',
            array($this, 'render_n8n_url_field'),
            'viswalstudio-ai-search',
            'viswalstudio_ai_search_main'
        );

        add_settings_field(
            'viswalstudio_ai_search_webhook_path',
            'Webhook Path',
            array($this, 'render_webhook_path_field'),
            'viswalstudio-ai-search',
            'viswalstudio_ai_search_main'
        );
    }

    public function render_section_text() {
        echo '<p>Configure the connection to your n8n and Ollama services.</p>';
    }

    public function render_n8n_url_field() {
        $value = get_option('viswalstudio_ai_search_n8n_url', 'http://localhost:5678');
        echo '<input type="text" name="viswalstudio_ai_search_n8n_url" value="' . esc_attr($value) . '" class="regular-text" />';
        echo '<p class="description">URL of your n8n instance (e.g., http://localhost:5678)</p>';
    }

    public function render_webhook_path_field() {
        $value = get_option('viswalstudio_ai_search_webhook_path', 'webhook/search');
        echo '<input type="text" name="viswalstudio_ai_search_webhook_path" value="' . esc_attr($value) . '" class="regular-text" />';
        echo '<p class="description">Webhook path for the search endpoint (e.g., webhook/search)</p>';
    }

    public function render_settings_page() {
        if (!current_user_can('manage_options')) {
            return;
        }
        ?>
        <div class="wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
            <form action="options.php" method="post">
                <?php
                settings_fields('viswalstudio_ai_search_options');
                do_settings_sections('viswalstudio-ai-search');
                submit_button('Save Settings');
                ?>
            </form>
        </div>
        <?php
    }
}
