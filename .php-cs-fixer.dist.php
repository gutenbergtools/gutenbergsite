<?php

$finder = PhpCsFixer\Finder::create()
    ->in(__DIR__)
    ->name('*.php')
    ->name('*.phh')
    ->name('*.inc')
;

$config = new PhpCsFixer\Config();
$config->setParallelConfig(PhpCsFixer\Runner\Parallel\ParallelConfigFactory::detect());
$config->setRules([
        '@PSR12' => true,
        '@PHP74Migration' => true,
        // PHP tags
        'linebreak_after_opening_tag' => true,
        'blank_line_after_opening_tag' => false,
        'echo_tag_syntax' => ['format' => 'long'],
        // arrays
        'array_indentation' => true,
        'trim_array_spaces' => true,
        'whitespace_after_comma_in_array' => true,
        // whitespace
        'no_spaces_around_offset' => ['positions' => ['inside', 'outside']],
        'binary_operator_spaces' => ['operators' => ['=' => 'single_space']],
        // spaces around constructs is part of PSR2 spec (which is part of @PSR12
        // ruleset) but isn't being picked up when this was introduced in 3.16.0
        'single_space_around_construct' => [
            // remove 'echo' from the default list since we sometimes use it
            // for laying out HTML blocks in a more human-readable way
            'constructs_followed_by_a_single_space' => ['abstract', 'as', 'attribute', 'break', 'case', 'catch', 'class', 'clone', 'comment', 'const', 'const_import', 'continue', 'do', 'else', 'elseif', 'enum', 'extends', 'final', 'finally', 'for', 'foreach', 'function', 'function_import', 'global', 'goto', 'if', 'implements', 'include', 'include_once', 'instanceof', 'insteadof', 'interface', 'match', 'named_argument', 'namespace', 'new', 'open_tag_with_echo', 'php_doc', 'php_open', 'print', 'private', 'protected', 'public', 'readonly', 'require', 'require_once', 'return', 'static', 'switch', 'throw', 'trait', 'try', 'type_colon', 'use', 'use_lambda', 'use_trait', 'var', 'while', 'yield', 'yield_from'],
        ],
        'space_after_semicolon' => true,
        // comments
        'single_line_comment_style' => ['comment_types' => ['asterisk', 'hash']],
        // misc
        'no_useless_return' => true,
        'no_mixed_echo_print' => ['use' => 'echo'],
        'method_chaining_indentation' => true,
]);

$config->setFinder($finder);
return $config;
