<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\Request;

class NewsletterController extends Controller
{
    public function subscribe(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email|unique:newsletter_subscribers,email',
            'locale' => 'nullable|in:fr,ar',
        ]);

        $data['locale'] = $data['locale'] ?? app()->getLocale();

        NewsletterSubscriber::create($data);

        return response()->json(['success' => true, 'message' => 'Inscription réussie.']);
    }
}
