<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageContent;
use Illuminate\Http\Request;
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
        $data = $request->validate([
            'value_fr' => 'nullable|string',
            'value_ar' => 'nullable|string',
        ]);

        $pageContent->update($data);

        return redirect()->route('admin.page-contents.index', ['page' => $pageContent->page])
            ->with('success', 'Contenu mis à jour.');
    }
}
