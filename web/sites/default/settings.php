<?php

/**
 * Load services definition file.
 */
$settings['container_yamls'][] = __DIR__ . '/services.yml';

/**
 * Include the Pantheon-specific settings file.
 *
 * n.b. The settings.pantheon.php file makes some changes
 *      that affect all environments that this site
 *      exists in.  Always include this file, even in
 *      a local development environment, to ensure that
 *      the site settings remain consistent.
 */
/**
 * Skipping permissions hardening will make scaffolding
 * work better, but will also raise a warning when you
 * install Drupal.
 *
 * https://www.drupal.org/project/drupal/issues/3091285
 */
// $settings['skip_permissions_hardening'] = TRUE;

/**
 * If there is a local settings file, then include it
 */
$databases['default']['default'] = array (
  'database' => 'u861386594_zo_db',
  'username' => 'u861386594_zo_ad',
  'password' => 'Sumoworld@123',
  'prefix' => '',
  'host' => '127.0.0.1',
  'port' => '3306',
  'isolation_level' => 'READ COMMITTED',
  'driver' => 'mysql',
  'namespace' => 'Drupal\\mysql\\Driver\\Database\\mysql',
);
 
$settings['hash_salt'] = '_gj6ROOx2RMWRbMYn4iLBDYn6SUN_KXR-jNJmJ07wefLh4cPjXXMowgFdJSzLi219dgo-VV97A';

// $settings['base_url'] = 'https://zoyace.io/';


// $config['system.logging']['error_level'] = 'verbose';
// ini_set('display_errors', TRUE);
// ini_set('display_startup_errors', TRUE);
// error_reporting(E_ALL);

$settings['update_free_access'] = FALSE;
$settings['config_sync_directory'] = 'sites/default/files/sync';