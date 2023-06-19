source "https://rubygems.org"

gem "jekyll"
# This will help ensure the proper Jekyll version is running.
# gem "jekyll", "~> 3.9.0"

gem "jemoji"

# Theme
gem "davidelanza-portfolio", path: "./themes/davidelanza-portfolio"

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
    gem "tzinfo", "~> 1.2"
    gem "tzinfo-data"
end

# gem 'wdm', '>= 0.1.0' if Gem.win_platform?
# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# To fix --livereload (https://stackoverflow.com/a/65547010/13975476)
gem 'eventmachine'

# Jekyll plugins
gem "jekyll-seo-tag", "~> 2.1"
gem "jekyll-sitemap", "~> 1.3"