<?php
/**
 * Widget for AI Search
 */

class Viswalstudio_AI_Search_Widget {
    private static $instance = null;

    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('widgets_init', array($this, 'register_widget'));
    }

    public function register_widget() {
        register_widget('Viswalstudio_AI_Search_Widget_Class');
    }
}

class Viswalstudio_AI_Search_Widget_Class extends WP_Widget {
    public function __construct() {
        parent::__construct(
            'viswalstudio_ai_search_widget',
            'AI Search',
            array('description' => 'AI-powered search widget using n8n and Ollama')
        );
    }

    public function widget($args, $instance) {
        echo $args['before_widget'];
        
        if (!empty($instance['title'])) {
            echo $args['before_title'] . apply_filters('widget_title', $instance['title']) . $args['after_title'];
        }
        
        ?>
        <div class="viswalstudio-ai-search-widget">
            <form class="viswalstudio-ai-search-form">
                <input type="text" 
                       name="ai_search_query" 
                       class="viswalstudio-ai-search-input" 
                       placeholder="Ask AI anything..." 
                       required />
                <button type="submit" class="viswalstudio-ai-search-submit">Search</button>
            </form>
            <div class="viswalstudio-ai-search-results" style="display:none;">
                <div class="viswalstudio-ai-search-loading">Searching...</div>
                <div class="viswalstudio-ai-search-response"></div>
            </div>
        </div>
        <?php
        
        echo $args['after_widget'];
    }

    public function form($instance) {
        $title = !empty($instance['title']) ? $instance['title'] : 'AI Search';
        ?>
        <p>
            <label for="<?php echo $this->get_field_id('title'); ?>">Title:</label>
            <input class="widefat" 
                   id="<?php echo $this->get_field_id('title'); ?>" 
                   name="<?php echo $this->get_field_name('title'); ?>" 
                   type="text" 
                   value="<?php echo esc_attr($title); ?>" />
        </p>
        <?php
    }

    public function update($new_instance, $old_instance) {
        $instance = array();
        $instance['title'] = (!empty($new_instance['title'])) ? sanitize_text_field($new_instance['title']) : '';
        return $instance;
    }
}
