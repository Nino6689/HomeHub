<?php
/**
 * HomeHub Portfolio Custom Post Type
 *
 * This file registers the Portfolio custom post type for case studies.
 *
 * INSTALLATION:
 * 1. Copy this code to WPCode (Insert Headers and Footers plugin)
 * 2. Or add to your theme's functions.php (not recommended if using Oxygen)
 * 3. Or create a site-specific plugin
 *
 * @package HomeHub
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register Portfolio Custom Post Type
 */
function homehub_register_portfolio_cpt() {

    $labels = array(
        'name'                  => _x('Portfolio', 'Post type general name', 'homehub'),
        'singular_name'         => _x('Project', 'Post type singular name', 'homehub'),
        'menu_name'             => _x('Portfolio', 'Admin Menu text', 'homehub'),
        'name_admin_bar'        => _x('Project', 'Add New on Toolbar', 'homehub'),
        'add_new'               => __('Add New', 'homehub'),
        'add_new_item'          => __('Add New Project', 'homehub'),
        'new_item'              => __('New Project', 'homehub'),
        'edit_item'             => __('Edit Project', 'homehub'),
        'view_item'             => __('View Project', 'homehub'),
        'all_items'             => __('All Projects', 'homehub'),
        'search_items'          => __('Search Projects', 'homehub'),
        'parent_item_colon'     => __('Parent Projects:', 'homehub'),
        'not_found'             => __('No projects found.', 'homehub'),
        'not_found_in_trash'    => __('No projects found in Trash.', 'homehub'),
        'featured_image'        => _x('Project Cover Image', 'Overrides the "Featured Image" phrase', 'homehub'),
        'set_featured_image'    => _x('Set cover image', 'Overrides the "Set featured image" phrase', 'homehub'),
        'remove_featured_image' => _x('Remove cover image', 'Overrides the "Remove featured image" phrase', 'homehub'),
        'use_featured_image'    => _x('Use as cover image', 'Overrides the "Use as featured image" phrase', 'homehub'),
        'archives'              => _x('Project Archives', 'The post type archive label', 'homehub'),
        'insert_into_item'      => _x('Insert into project', 'Overrides the "Insert into post" phrase', 'homehub'),
        'uploaded_to_this_item' => _x('Uploaded to this project', 'Overrides the "Uploaded to this post" phrase', 'homehub'),
        'filter_items_list'     => _x('Filter projects list', 'Screen reader text', 'homehub'),
        'items_list_navigation' => _x('Projects list navigation', 'Screen reader text', 'homehub'),
        'items_list'            => _x('Projects list', 'Screen reader text', 'homehub'),
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'show_in_rest'       => true, // Enable Gutenberg editor
        'query_var'          => true,
        'rewrite'            => array('slug' => 'work', 'with_front' => false),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => 5,
        'menu_icon'          => 'dashicons-portfolio',
        'supports'           => array(
            'title',
            'editor',
            'thumbnail',
            'excerpt',
            'custom-fields',
            'revisions',
        ),
    );

    register_post_type('portfolio', $args);
}
add_action('init', 'homehub_register_portfolio_cpt');

/**
 * Register Portfolio Category Taxonomy
 */
function homehub_register_portfolio_taxonomy() {

    $labels = array(
        'name'                       => _x('Project Categories', 'Taxonomy General Name', 'homehub'),
        'singular_name'              => _x('Project Category', 'Taxonomy Singular Name', 'homehub'),
        'menu_name'                  => __('Categories', 'homehub'),
        'all_items'                  => __('All Categories', 'homehub'),
        'parent_item'                => __('Parent Category', 'homehub'),
        'parent_item_colon'          => __('Parent Category:', 'homehub'),
        'new_item_name'              => __('New Category Name', 'homehub'),
        'add_new_item'               => __('Add New Category', 'homehub'),
        'edit_item'                  => __('Edit Category', 'homehub'),
        'update_item'                => __('Update Category', 'homehub'),
        'view_item'                  => __('View Category', 'homehub'),
        'separate_items_with_commas' => __('Separate categories with commas', 'homehub'),
        'add_or_remove_items'        => __('Add or remove categories', 'homehub'),
        'choose_from_most_used'      => __('Choose from the most used', 'homehub'),
        'popular_items'              => __('Popular Categories', 'homehub'),
        'search_items'               => __('Search Categories', 'homehub'),
        'not_found'                  => __('Not Found', 'homehub'),
        'no_terms'                   => __('No categories', 'homehub'),
        'items_list'                 => __('Categories list', 'homehub'),
        'items_list_navigation'      => __('Categories list navigation', 'homehub'),
    );

    $args = array(
        'labels'            => $labels,
        'hierarchical'      => true,
        'public'            => true,
        'show_ui'           => true,
        'show_admin_column' => true,
        'show_in_nav_menus' => true,
        'show_tagcloud'     => false,
        'show_in_rest'      => true, // Enable in Gutenberg
        'rewrite'           => array('slug' => 'work-category', 'with_front' => false),
    );

    register_taxonomy('portfolio_category', array('portfolio'), $args);
}
add_action('init', 'homehub_register_portfolio_taxonomy');

/**
 * Register Portfolio Tags Taxonomy
 */
function homehub_register_portfolio_tags() {

    $labels = array(
        'name'                       => _x('Project Tags', 'Taxonomy General Name', 'homehub'),
        'singular_name'              => _x('Project Tag', 'Taxonomy Singular Name', 'homehub'),
        'menu_name'                  => __('Tags', 'homehub'),
        'all_items'                  => __('All Tags', 'homehub'),
        'new_item_name'              => __('New Tag Name', 'homehub'),
        'add_new_item'               => __('Add New Tag', 'homehub'),
        'edit_item'                  => __('Edit Tag', 'homehub'),
        'update_item'                => __('Update Tag', 'homehub'),
        'view_item'                  => __('View Tag', 'homehub'),
        'separate_items_with_commas' => __('Separate tags with commas', 'homehub'),
        'add_or_remove_items'        => __('Add or remove tags', 'homehub'),
        'choose_from_most_used'      => __('Choose from the most used', 'homehub'),
        'popular_items'              => __('Popular Tags', 'homehub'),
        'search_items'               => __('Search Tags', 'homehub'),
        'not_found'                  => __('Not Found', 'homehub'),
    );

    $args = array(
        'labels'            => $labels,
        'hierarchical'      => false,
        'public'            => true,
        'show_ui'           => true,
        'show_admin_column' => true,
        'show_in_nav_menus' => true,
        'show_tagcloud'     => true,
        'show_in_rest'      => true,
        'rewrite'           => array('slug' => 'work-tag', 'with_front' => false),
    );

    register_taxonomy('portfolio_tag', array('portfolio'), $args);
}
add_action('init', 'homehub_register_portfolio_tags');

/**
 * Register Custom Meta Fields for Portfolio
 * These fields will be accessible in Oxygen Builder
 */
function homehub_register_portfolio_meta() {

    // Client Name
    register_post_meta('portfolio', 'portfolio_client', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Client name for this project',
    ));

    // Project Year
    register_post_meta('portfolio', 'portfolio_year', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Year the project was completed',
    ));

    // Project URL
    register_post_meta('portfolio', 'portfolio_url', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Live project URL',
    ));

    // Services Provided
    register_post_meta('portfolio', 'portfolio_services', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Services provided (comma separated)',
    ));

    // Technologies Used
    register_post_meta('portfolio', 'portfolio_technologies', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Technologies used (comma separated)',
    ));

    // Project Duration/Timeline
    register_post_meta('portfolio', 'portfolio_timeline', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Project timeline (e.g., "6 weeks")',
    ));

    // The Challenge
    register_post_meta('portfolio', 'portfolio_challenge', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'The challenge or problem the client faced',
    ));

    // The Solution
    register_post_meta('portfolio', 'portfolio_solution', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'The solution provided',
    ));

    // Results/Impact
    register_post_meta('portfolio', 'portfolio_results', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Results and impact of the project',
    ));

    // Client Testimonial
    register_post_meta('portfolio', 'portfolio_testimonial', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Client testimonial quote',
    ));

    // Testimonial Author
    register_post_meta('portfolio', 'portfolio_testimonial_author', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Name and title of testimonial author',
    ));

    // Featured Project (for homepage)
    register_post_meta('portfolio', 'portfolio_featured', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'boolean',
        'description'  => 'Feature this project on homepage',
    ));

    // Gallery Images (stored as comma-separated attachment IDs)
    register_post_meta('portfolio', 'portfolio_gallery', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Gallery image attachment IDs (comma separated)',
    ));
}
add_action('init', 'homehub_register_portfolio_meta');

/**
 * Add Meta Boxes for Portfolio Custom Fields
 */
function homehub_add_portfolio_meta_boxes() {
    add_meta_box(
        'portfolio_details',
        __('Project Details', 'homehub'),
        'homehub_portfolio_details_callback',
        'portfolio',
        'normal',
        'high'
    );

    add_meta_box(
        'portfolio_case_study',
        __('Case Study Content', 'homehub'),
        'homehub_portfolio_case_study_callback',
        'portfolio',
        'normal',
        'default'
    );
}
add_action('add_meta_boxes', 'homehub_add_portfolio_meta_boxes');

/**
 * Portfolio Details Meta Box Callback
 */
function homehub_portfolio_details_callback($post) {
    wp_nonce_field('homehub_portfolio_nonce', 'homehub_portfolio_nonce');

    $client = get_post_meta($post->ID, 'portfolio_client', true);
    $year = get_post_meta($post->ID, 'portfolio_year', true);
    $url = get_post_meta($post->ID, 'portfolio_url', true);
    $services = get_post_meta($post->ID, 'portfolio_services', true);
    $technologies = get_post_meta($post->ID, 'portfolio_technologies', true);
    $timeline = get_post_meta($post->ID, 'portfolio_timeline', true);
    $featured = get_post_meta($post->ID, 'portfolio_featured', true);
    ?>
    <style>
        .homehub-meta-row { margin-bottom: 15px; }
        .homehub-meta-row label { display: block; font-weight: 600; margin-bottom: 5px; }
        .homehub-meta-row input[type="text"],
        .homehub-meta-row input[type="url"] { width: 100%; }
        .homehub-meta-row.inline { display: flex; align-items: center; gap: 10px; }
        .homehub-meta-row.inline label { margin-bottom: 0; }
    </style>
    <div class="homehub-meta-row">
        <label for="portfolio_client"><?php _e('Client Name', 'homehub'); ?></label>
        <input type="text" id="portfolio_client" name="portfolio_client" value="<?php echo esc_attr($client); ?>" />
    </div>
    <div class="homehub-meta-row">
        <label for="portfolio_year"><?php _e('Project Year', 'homehub'); ?></label>
        <input type="text" id="portfolio_year" name="portfolio_year" value="<?php echo esc_attr($year); ?>" placeholder="e.g., 2024" />
    </div>
    <div class="homehub-meta-row">
        <label for="portfolio_url"><?php _e('Live Project URL', 'homehub'); ?></label>
        <input type="url" id="portfolio_url" name="portfolio_url" value="<?php echo esc_url($url); ?>" placeholder="https://" />
    </div>
    <div class="homehub-meta-row">
        <label for="portfolio_services"><?php _e('Services Provided', 'homehub'); ?></label>
        <input type="text" id="portfolio_services" name="portfolio_services" value="<?php echo esc_attr($services); ?>" placeholder="Web Design, Development, SEO" />
        <p class="description"><?php _e('Separate multiple services with commas', 'homehub'); ?></p>
    </div>
    <div class="homehub-meta-row">
        <label for="portfolio_technologies"><?php _e('Technologies Used', 'homehub'); ?></label>
        <input type="text" id="portfolio_technologies" name="portfolio_technologies" value="<?php echo esc_attr($technologies); ?>" placeholder="WordPress, Oxygen Builder, PHP" />
        <p class="description"><?php _e('Separate multiple technologies with commas', 'homehub'); ?></p>
    </div>
    <div class="homehub-meta-row">
        <label for="portfolio_timeline"><?php _e('Project Timeline', 'homehub'); ?></label>
        <input type="text" id="portfolio_timeline" name="portfolio_timeline" value="<?php echo esc_attr($timeline); ?>" placeholder="e.g., 6 weeks" />
    </div>
    <div class="homehub-meta-row inline">
        <input type="checkbox" id="portfolio_featured" name="portfolio_featured" value="1" <?php checked($featured, '1'); ?> />
        <label for="portfolio_featured"><?php _e('Feature this project on homepage', 'homehub'); ?></label>
    </div>
    <?php
}

/**
 * Portfolio Case Study Meta Box Callback
 */
function homehub_portfolio_case_study_callback($post) {
    $challenge = get_post_meta($post->ID, 'portfolio_challenge', true);
    $solution = get_post_meta($post->ID, 'portfolio_solution', true);
    $results = get_post_meta($post->ID, 'portfolio_results', true);
    $testimonial = get_post_meta($post->ID, 'portfolio_testimonial', true);
    $testimonial_author = get_post_meta($post->ID, 'portfolio_testimonial_author', true);
    ?>
    <div class="homehub-meta-row">
        <label for="portfolio_challenge"><?php _e('The Challenge', 'homehub'); ?></label>
        <textarea id="portfolio_challenge" name="portfolio_challenge" rows="4" style="width:100%;"><?php echo esc_textarea($challenge); ?></textarea>
        <p class="description"><?php _e('Describe the problem or challenge the client faced', 'homehub'); ?></p>
    </div>
    <div class="homehub-meta-row">
        <label for="portfolio_solution"><?php _e('The Solution', 'homehub'); ?></label>
        <textarea id="portfolio_solution" name="portfolio_solution" rows="4" style="width:100%;"><?php echo esc_textarea($solution); ?></textarea>
        <p class="description"><?php _e('Describe the solution you provided', 'homehub'); ?></p>
    </div>
    <div class="homehub-meta-row">
        <label for="portfolio_results"><?php _e('Results & Impact', 'homehub'); ?></label>
        <textarea id="portfolio_results" name="portfolio_results" rows="4" style="width:100%;"><?php echo esc_textarea($results); ?></textarea>
        <p class="description"><?php _e('Describe the outcomes and impact of the project', 'homehub'); ?></p>
    </div>
    <div class="homehub-meta-row">
        <label for="portfolio_testimonial"><?php _e('Client Testimonial', 'homehub'); ?></label>
        <textarea id="portfolio_testimonial" name="portfolio_testimonial" rows="3" style="width:100%;"><?php echo esc_textarea($testimonial); ?></textarea>
    </div>
    <div class="homehub-meta-row">
        <label for="portfolio_testimonial_author"><?php _e('Testimonial Author', 'homehub'); ?></label>
        <input type="text" id="portfolio_testimonial_author" name="portfolio_testimonial_author" value="<?php echo esc_attr($testimonial_author); ?>" placeholder="John Smith, CEO at Company" />
    </div>
    <?php
}

/**
 * Save Portfolio Meta Fields
 */
function homehub_save_portfolio_meta($post_id) {
    // Check nonce
    if (!isset($_POST['homehub_portfolio_nonce']) || !wp_verify_nonce($_POST['homehub_portfolio_nonce'], 'homehub_portfolio_nonce')) {
        return;
    }

    // Check autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    // Check permissions
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    // Save meta fields
    $fields = array(
        'portfolio_client',
        'portfolio_year',
        'portfolio_url',
        'portfolio_services',
        'portfolio_technologies',
        'portfolio_timeline',
        'portfolio_challenge',
        'portfolio_solution',
        'portfolio_results',
        'portfolio_testimonial',
        'portfolio_testimonial_author',
    );

    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            if ($field === 'portfolio_url') {
                update_post_meta($post_id, $field, esc_url_raw($_POST[$field]));
            } else {
                update_post_meta($post_id, $field, sanitize_textarea_field($_POST[$field]));
            }
        }
    }

    // Handle checkbox
    $featured = isset($_POST['portfolio_featured']) ? '1' : '';
    update_post_meta($post_id, 'portfolio_featured', $featured);
}
add_action('save_post_portfolio', 'homehub_save_portfolio_meta');

/**
 * Flush rewrite rules on activation
 * Call this once after adding the CPT
 */
function homehub_flush_rewrite_rules() {
    homehub_register_portfolio_cpt();
    homehub_register_portfolio_taxonomy();
    homehub_register_portfolio_tags();
    flush_rewrite_rules();
}
// Uncomment the line below and visit any admin page once, then re-comment it
// add_action('init', 'homehub_flush_rewrite_rules', 999);

/**
 * Add Portfolio to Oxygen Builder Post Types
 */
function homehub_add_portfolio_to_oxygen($post_types) {
    $post_types['portfolio'] = 'portfolio';
    return $post_types;
}
add_filter('oxygen_post_types', 'homehub_add_portfolio_to_oxygen');
