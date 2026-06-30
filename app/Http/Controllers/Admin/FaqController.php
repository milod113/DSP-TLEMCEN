<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaqController extends Controller
{
    public function index()
    {
        $faqs = Faq::ordered()->paginate(30);
        return Inertia::render('Admin/Faqs/Index', ['faqs' => $faqs]);
    }

    public function create()
    {
        return Inertia::render('Admin/Faqs/Form', ['faq' => null]);
    }

    public function edit(Faq $faq)
    {
        return Inertia::render('Admin/Faqs/Form', ['faq' => $faq]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'question_fr' => 'required|string|max:255',
            'question_ar' => 'nullable|string|max:255',
            'answer_fr' => 'required|string',
            'answer_ar' => 'nullable|string',
            'categorie' => 'nullable|string|max:100',
            'sort_order' => 'nullable|integer',
            'is_published' => 'in:0,1,true,false',
        ]);

        $data['is_published'] = filter_var($data['is_published'] ?? true, FILTER_VALIDATE_BOOLEAN);

        Faq::create($data);

        return redirect()->route('admin.faqs.index')->with('success', 'FAQ créée.');
    }

    public function update(Request $request, Faq $faq)
    {
        $data = $request->validate([
            'question_fr' => 'required|string|max:255',
            'question_ar' => 'nullable|string|max:255',
            'answer_fr' => 'required|string',
            'answer_ar' => 'nullable|string',
            'categorie' => 'nullable|string|max:100',
            'sort_order' => 'nullable|integer',
            'is_published' => 'in:0,1,true,false',
        ]);

        $data['is_published'] = filter_var($data['is_published'] ?? true, FILTER_VALIDATE_BOOLEAN);

        $faq->update($data);

        return redirect()->route('admin.faqs.index')->with('success', 'FAQ mise à jour.');
    }

    public function destroy(Faq $faq)
    {
        $faq->delete();
        return redirect()->route('admin.faqs.index')->with('success', 'FAQ supprimée.');
    }
}
