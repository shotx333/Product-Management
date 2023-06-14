<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductCategoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type,Authorization, X-Requested-With,X-CSRF-Token');
header('Access-Control-Allow-Origin: *');

// Product routes
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::post('/products', [ProductController::class, 'store']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);

// Category routes
Route::get('/categories', [ProductCategoryController::class, 'index']);
Route::get('/categories/{id}', [ProductCategoryController::class, 'show']);
Route::post('/categories', [ProductCategoryController::class, 'store']);
Route::put('/categories/{id}', [ProductCategoryController::class, 'update']);
Route::delete('/categories/{id}', [ProductCategoryController::class, 'destroy']);
