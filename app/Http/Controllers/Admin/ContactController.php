<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::latest()->paginate(20);
        return Inertia::render('Admin/Contacts/Index', ['contacts' => $contacts]);
    }

    public function update(Contact $contact)
    {
        $contact->update(['lu' => true]);
        return redirect()->route('admin.contacts.index')->with('success', 'Marqué comme lu.');
    }
}
