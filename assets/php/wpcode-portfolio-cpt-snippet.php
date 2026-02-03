<?php
/**
 * WPCode Snippet: HomeHub Portfolio Custom Post Type
 *
 * INSTRUCTIONS:
 * 1. Go to WPCode > Add Snippet in WordPress admin
 * 2. Click "Add Your Custom Code (New Snippet)"
 * 3. Name: "HomeHub Portfolio CPT"
 * 4. Code Type: PHP Snippet
 * 5. Copy everything below this comment block
 * 6. Location: Run Everywhere
 * 7. Click "Save Snippet" and "Activate"
 * 8. Go to Settings > Permalinks and click "Save Changes" to flush rewrite rules
 *
 * @package HomeHub
 */

// Register Portfolio Custom Post Type
add_action('init', function() {
    register_post_type('portfolio', [
        'labels' => [
            'name' => 'Portfolio',
            'singular_name' => 'Project',
            'menu_name' => 'Portfolio',
            'add_new' => 'Add New',
            'add_new_item' => 'Add New Project',
            'edit_item' => 'Edit Project',
            'view_item' => 'View Project',
            'all_items' => 'All Projects',
            'search_items' => 'Search Projects',
            'not_found' => 'No projects found.',
            'not_found_in_trash' => 'No projects found in Trash.',
            'featured_image' => 'Project Cover Image',
            'set_featured_image' => 'Set cover image',
            'remove_featured_image' => 'Remove cover image',
            'use_featured_image' => 'Use as cover image',
        ],
        'public' => true,
        'show_in_rest' => true,
        'menu_icon' => 'dashicons-portfolio',
        'menu_position' => 5,
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'revisions'],
        'rewrite' => ['slug' => 'work', 'with_front' => false],
        'has_archive' => true,
    ]);

    // Portfolio Categories
    register_taxonomy('portfolio_category', 'portfolio', [
        'labels' => [
            'name' => 'Project Categories',
            'singular_name' => 'Project Category',
            'add_new_item' => 'Add New Category',
            'edit_item' => 'Edit Category',
            'search_items' => 'Search Categories',
        ],
        'hierarchical' => true,
        'show_in_rest' => true,
        'rewrite' => ['slug' => 'work-category', 'with_front' => false],
    ]);

    // Portfolio Tags
    register_taxonomy('portfolio_tag', 'portfolio', [
        'labels' => [
            'name' => 'Project Tags',
            'singular_name' => 'Project Tag',
        ],
        'hierarchical' => false,
        'show_in_rest' => true,
        'rewrite' => ['slug' => 'work-tag', 'with_front' => false],
    ]);
});

// Register Portfolio Meta Fields
add_action('init', function() {
    $meta_fields = [
        'portfolio_client' => 'string',
        'portfolio_year' => 'string',
        'portfolio_url' => 'string',
        'portfolio_services' => 'string',
        'portfolio_technologies' => 'string',
        'portfolio_timeline' => 'string',
        'portfolio_challenge' => 'string',
        'portfolio_solution' => 'string',
        'portfolio_results' => 'string',
        'portfolio_testimonial' => 'string',
        'portfolio_testimonial_author' => 'string',
        'portfolio_featured' => 'boolean',
    ];

    foreach ($meta_fields as $key => $type) {
        register_post_meta('portfolio', $key, [
            'show_in_rest' => true,
            'single' => true,
            'type' => $type,
        ]);
    }
});

// Add Meta Boxes
add_action('add_meta_boxes', function() {
    add_meta_box('portfolio_details', 'Project Details', 'homehub_portfolio_details_metabox', 'portfolio', 'normal', 'high');
    add_meta_box('portfolio_case_study', 'Case Study Content', 'homehub_portfolio_case_study_metabox', 'portfolio', 'normal', 'default');
});

function homehub_portfolio_details_metabox($post) {
    wp_nonce_field('homehub_portfolio', 'homehub_portfolio_nonce');
    $fields = [
        'portfolio_client' => ['label' => 'Client Name', 'type' => 'text'],
        'portfolio_year' => ['label' => 'Project Year', 'type' => 'text', 'placeholder' => 'e.g., 2024'],
        'portfolio_url' => ['label' => 'Live Project URL', 'type' => 'url', 'placeholder' => 'https://'],
        'portfolio_services' => ['label' => 'Services Provided', 'type' => 'text', 'placeholder' => 'Web Design, Development, SEO', 'desc' => 'Separate with commas'],
        'portfolio_technologies' => ['label' => 'Technologies Used', 'type' => 'text', 'placeholder' => 'WordPress, Oxygen Builder, PHP', 'desc' => 'Separate with commas'],
        'portfolio_timeline' => ['label' => 'Project Timeline', 'type' => 'text', 'placeholder' => 'e.g., 6 weeks'],
    ];
    echo '<style>.hh-field{margin-bottom:15px}.hh-field label{display:block;font-weight:600;margin-bottom:5px}.hh-field input{width:100%}.hh-field .description{color:#666;font-size:12px;margin-top:3px}</style>';
    foreach ($fields as $key => $field) {
        $value = get_post_meta($post->ID, $key, true);
        echo '<div class="hh-field">';
        echo '<label for="'.$key.'">'.$field['label'].'</label>';
        echo '<input type="'.($field['type'] ?? 'text').'" id="'.$key.'" name="'.$key.'" value="'.esc_attr($value).'" placeholder="'.($field['placeholder'] ?? '').'">';
        if (!empty($field['desc'])) echo '<p class="description">'.$field['desc'].'</p>';
        echo '</div>';
    }
    $featured = get_post_meta($post->ID, 'portfolio_featured', true);
    echo '<div class="hh-field"><label><input type="checkbox" name="portfolio_featured" value="1" '.checked($featured, '1', false).'> Feature on homepage</label></div>';
}

function homehub_portfolio_case_study_metabox($post) {
    $fields = [
        'portfolio_challenge' => ['label' => 'The Challenge', 'desc' => 'Describe the problem the client faced'],
        'portfolio_solution' => ['label' => 'The Solution', 'desc' => 'Describe your solution'],
        'portfolio_results' => ['label' => 'Results & Impact', 'desc' => 'Describe the outcomes'],
        'portfolio_testimonial' => ['label' => 'Client Testimonial'],
        'portfolio_testimonial_author' => ['label' => 'Testimonial Author', 'type' => 'text', 'placeholder' => 'John Smith, CEO at Company'],
    ];
    foreach ($fields as $key => $field) {
        $value = get_post_meta($post->ID, $key, true);
        echo '<div class="hh-field">';
        echo '<label for="'.$key.'">'.$field['label'].'</label>';
        if (($field['type'] ?? 'textarea') === 'text') {
            echo '<input type="text" id="'.$key.'" name="'.$key.'" value="'.esc_attr($value).'" placeholder="'.($field['placeholder'] ?? '').'">';
        } else {
            echo '<textarea id="'.$key.'" name="'.$key.'" rows="3" style="width:100%">'.esc_textarea($value).'</textarea>';
        }
        if (!empty($field['desc'])) echo '<p class="description">'.$field['desc'].'</p>';
        echo '</div>';
    }
}

// Save Meta Fields
add_action('save_post_portfolio', function($post_id) {
    if (!isset($_POST['homehub_portfolio_nonce']) || !wp_verify_nonce($_POST['homehub_portfolio_nonce'], 'homehub_portfolio')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    $text_fields = ['portfolio_client', 'portfolio_year', 'portfolio_services', 'portfolio_technologies', 'portfolio_timeline', 'portfolio_challenge', 'portfolio_solution', 'portfolio_results', 'portfolio_testimonial', 'portfolio_testimonial_author'];
    foreach ($text_fields as $field) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, $field, sanitize_textarea_field($_POST[$field]));
        }
    }
    if (isset($_POST['portfolio_url'])) {
        update_post_meta($post_id, 'portfolio_url', esc_url_raw($_POST['portfolio_url']));
    }
    update_post_meta($post_id, 'portfolio_featured', isset($_POST['portfolio_featured']) ? '1' : '');
});

// Add Portfolio to Oxygen
add_filter('oxygen_post_types', function($post_types) {
    $post_types['portfolio'] = 'portfolio';
    return $post_types;
});
