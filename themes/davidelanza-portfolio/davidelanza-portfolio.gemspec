# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "davidelanza-portfolio"
  spec.version       = "0.1.0"
  spec.authors       = ["Davide Lanza"]
  spec.email         = ["info@davidelanza.it"]

  spec.summary       = "Davide Lanza porfolio jekyll theme"
  spec.homepage      = "https://davidelanza.it"
  spec.license       = "Davide Lanza (c) All rights reserved"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README|_config\.yml)!i) }

  spec.add_runtime_dependency "jekyll", "~> 4.2"
end
