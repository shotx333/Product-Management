<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        'http://localhost:3000/',
        'http://localhost:3000',
        'products',
        'products/*',
        'categories',
        'categories/*'

    ];
    protected $addHttpCookie = true;

protected $headers = [
    'Access-Control-Allow-Origin' => '*',
    'Access-Control-Allow-Methods' => 'POST, GET, OPTIONS, PUT, DELETE',
    'Access-Control-Allow-Headers' => 'Content-Type, X-Auth-Token, Origin, Authorization, x-csrf-token',
];
}
