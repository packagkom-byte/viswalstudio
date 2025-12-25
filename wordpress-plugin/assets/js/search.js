/**
 * Viswalstudio AI Search - Frontend JavaScript
 */

(function($) {
    'use strict';

    $(document).ready(function() {
        // Handle search form submission
        $('.viswalstudio-ai-search-form').on('submit', function(e) {
            e.preventDefault();

            var $form = $(this);
            var $input = $form.find('.viswalstudio-ai-search-input');
            var $submit = $form.find('.viswalstudio-ai-search-submit');
            var $results = $form.siblings('.viswalstudio-ai-search-results');
            var $loading = $results.find('.viswalstudio-ai-search-loading');
            var $response = $results.find('.viswalstudio-ai-search-response');

            var query = $input.val().trim();

            if (!query) {
                return;
            }

            // Show loading state
            $submit.prop('disabled', true);
            $results.show();
            $loading.show();
            $response.empty();

            // Make AJAX request
            $.ajax({
                url: viswalstudioAISearch.ajaxurl,
                type: 'POST',
                data: {
                    action: 'viswalstudio_ai_search',
                    nonce: viswalstudioAISearch.nonce,
                    query: query
                },
                success: function(response) {
                    $loading.hide();

                    if (response.success && response.data) {
                        var data = response.data;
                        var html = '<div class="viswalstudio-ai-search-answer">';
                        html += '<p>' + escapeHtml(data.response || data.answer || 'No response received') + '</p>';
                        
                        if (data.timestamp) {
                            html += '<div class="viswalstudio-ai-search-timestamp">';
                            html += 'Answered at: ' + new Date(data.timestamp).toLocaleString();
                            html += '</div>';
                        }
                        
                        html += '</div>';
                        $response.html(html);
                    } else {
                        showError(response.data && response.data.message ? response.data.message : 'Unknown error occurred');
                    }
                },
                error: function(xhr, status, error) {
                    $loading.hide();
                    showError('Connection error: ' + error);
                },
                complete: function() {
                    $submit.prop('disabled', false);
                }
            });

            function showError(message) {
                $response.html('<div class="viswalstudio-ai-search-error">' + escapeHtml(message) + '</div>');
            }

            function escapeHtml(text) {
                var map = {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#039;'
                };
                return text.replace(/[&<>"']/g, function(m) { return map[m]; });
            }
        });
    });

})(jQuery);
