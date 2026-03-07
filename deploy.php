<?php
// Simple one-time deploy script - DELETE after use!
$source = __DIR__ . '/build/';
$dest = __DIR__ . '/';

function rcopy($src, $dst) {
    if (!is_dir($dst)) mkdir($dst, 0755, true);
    foreach (scandir($src) as $file) {
        if ($file === '.' || $file === '..') continue;
        $srcPath = $src . $file;
        $dstPath = $dst . $file;
        if (is_dir($srcPath)) {
            rcopy($srcPath . '/', $dstPath . '/');
        } else {
            copy($srcPath, $dstPath);
        }
    }
}

// Nuclear clean before copying to avoid Git locks
if (file_exists(__DIR__ . '/index.html')) unlink(__DIR__ . '/index.html');
if (file_exists(__DIR__ . '/.htaccess')) unlink(__DIR__ . '/.htaccess');

rcopy($source, $dest);

// Now write the correct .htaccess
$htaccess = <<<EOF
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /recruitment/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /recruitment/index.html [L]
</IfModule>
EOF;

file_put_contents(__DIR__ . '/.htaccess', $htaccess);
echo "<h1 style='color:green;font-family:sans-serif'>🚀 Nuclear Deployment Successful!</h1>";
echo "<p>Conflicts cleared. Files from <code>build/</code> are now live.</p>";
echo "<p><a href='/recruitment'>→ Visit the portal</a></p>";
