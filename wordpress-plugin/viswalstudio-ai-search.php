<?php
/**
 * Plugin Name: Viswalstudio AI Search
 * Plugin URI: https://github.com/packagkom-byte/viswalstudio
 * Description: AI-powered search integration using n8n and Ollama for WordPress
 * Version: 1.0.0
 * Author: Viswalstudio Team
 * Author URI: https://github.com/packagkom-byte
 * License: MIT
 * Text Domain: viswalstudio-ai-search
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('VISWALSTUDIO_AI_SEARCH_VERSION', '1.0.0');
define('VISWALSTUDIO_AI_SEARCH_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('VISWALSTUDIO_AI_SEARCH_PLUGIN_URL', plugin_dir_url(__FILE__));

// Include required files
require_once VISWALSTUDIO_AI_SEARCH_PLUGIN_DIR . 'includes/class-settings.php';
require_once VISWALSTUDIO_AI_SEARCH_PLUGIN_DIR . 'includes/class-api.php';
require_once VISWALSTUDIO_AI_SEARCH_PLUGIN_DIR . 'includes/class-widget.php';
require_once VISWALSTUDIO_AI_SEARCH_PLUGIN_DIR . 'includes/class-shortcode.php';

// Initialize plugin
class Viswalstudio_AI_Search {
    private static $instance = null;

    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('init', array($this, 'init'));
        add_action('admin_enqueue_scripts', array($this, 'admin_enqueue_scripts'));
        add_action('wp_enqueue_scripts', array($this, 'frontend_enqueue_scripts'));
    }

    public function init() {
        // Initialize components
        Viswalstudio_AI_Search_Settings::get_instance();
        Viswalstudio_AI_Search_API::get_instance();
        Viswalstudio_AI_Search_Widget::get_instance();
        Viswalstudio_AI_Search_Shortcode::get_instance();
    }

    public function admin_enqueue_scripts($hook) {
        if ($hook !== 'settings_page_viswalstudio-ai-search') {
            return;
        }
        
        wp_enqueue_style(
            'viswalstudio-ai-search-admin',
            VISWALSTUDIO_AI_SEARCH_PLUGIN_URL . 'assets/css/admin.css',
            array(),
            VISWALSTUDIO_AI_SEARCH_VERSION
        );
    }

    public function frontend_enqueue_scripts() {
        wp_enqueue_style(
            'viswalstudio-ai-search',
            VISWALSTUDIO_AI_SEARCH_PLUGIN_URL . 'assets/css/style.css',
            array(),
            VISWALSTUDIO_AI_SEARCH_VERSION
        );

        wp_enqueue_script(
            'viswalstudio-ai-search',
            VISWALSTUDIO_AI_SEARCH_PLUGIN_URL . 'assets/js/search.js',
            array('jquery'),
            VISWALSTUDIO_AI_SEARCH_VERSION,
            true
        );

        wp_localize_script('viswalstudio-ai-search', 'viswalstudioAISearch', array(
            'ajaxurl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('viswalstudio_ai_search_nonce')
        ));
    }
}

// Initialize the plugin
Viswalstudio_AI_Search::get_instance();
