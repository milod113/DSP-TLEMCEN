<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PageContentController extends Controller
{
    public function index()
    {
        $pages = PageContent::orderBy('page')->orderBy('sort_order')->get()->groupBy('page');

        return Inertia::render('Admin/PageContents/Index', ['pages' => $pages]);
    }

    public function edit(PageContent $pageContent)
    {
        return Inertia::render('Admin/PageContents/Form', ['content' => $pageContent]);
    }

    public function update(Request $request, PageContent $pageContent)
    {
        $rules = [
            'value_fr' => 'nullable|string',
            'value_ar' => 'nullable|string',
        ];

        if ($pageContent->type === 'image') {
            $rules['image'] = 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096';
        }

        $data = $request->validate($rules);

        if ($pageContent->type === 'image' && $request->hasFile('image')) {
            if ($pageContent->value_fr && !str_starts_with($pageContent->value_fr, 'http')) {
                Storage::disk('public')->delete($pageContent->value_fr);
            }

            $path = $request->file('image')->store('page-contents', 'public');
            $data['value_fr'] = $path;
            $data['value_ar'] = $path;
        }

        $pageContent->update($data);

        return redirect()->route('admin.page-contents.index', ['page' => $pageContent->page])
            ->with('success', 'Contenu mis a jour.');
    }
}
