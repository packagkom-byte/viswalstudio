<?php
/**
 * Shortcode for AI Search
 */

class Viswalstudio_AI_Search_Shortcode {
    private static $instance = null;

    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_shortcode('ai_search', array($this, 'render_shortcode'));
    }

    public function render_shortcode($atts) {
        $atts = shortcode_atts(array(
            'placeholder' => 'Ask AI anything...',
            'button_text' => 'Search'
        ), $atts);

        ob_start();
        ?>
        <div class="viswalstudio-ai-search-shortcode">
            <form class="viswalstudio-ai-search-form">
                <input type="text" 
                       name="ai_search_query" 
                       class="viswalstudio-ai-search-input" 
                       placeholder="<?php echo esc_attr($atts['placeholder']); ?>" 
                       required />
                <button type="submit" class="viswalstudio-ai-search-submit">
                    <?php echo esc_html($atts['button_text']); ?>
                </button>
            </form>
            <div class="viswalstudio-ai-search-results" style="display:none;">
                <div class="viswalstudio-ai-search-loading">Searching...</div>
                <div class="viswalstudio-ai-search-response"></div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
}
