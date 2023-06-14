<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use Illuminate\Http\Request;

class ProductCategoryController extends Controller
{
    public function index()
    {
        return ProductCategory::all();
    }

    public function store(Request $request)
    {
        $category = ProductCategory::create($request->all());

        return response()->json($category, 201);
    }

    public function show(ProductCategory $category)
    {
        return $category;
    }

    public function update(Request $request, ProductCategory $category)
    {
        $category->update($request->all());

        return response()->json($category, 200);
    }

    public function destroy(ProductCategory $category)
    {
        $category->delete();

        return response()->json(null, 204);
    }
}