<?php

namespace App\Http\Controllers;

use App\Models\AppelOffre;
use App\Models\Article;
use App\Models\Contact;
use App\Models\Etablissement;
use App\Models\PreventionTopic;
use App\Models\Reclamation;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        $recentArticles = Article::latest('published_at')
            ->latest()
            ->take(5)
            ->get(['id', 'title_fr', 'is_published', 'published_at', 'created_at']);

        $recentReclamations = Reclamation::latest()
            ->take(5)
            ->get(['id', 'nom', 'type', 'statut', 'numero_suivi', 'created_at']);

        $recentContacts = Contact::latest()
            ->take(5)
            ->get(['id', 'nom', 'sujet', 'lu', 'created_at']);

        $recentTenders = AppelOffre::latest('date_publication')
            ->take(4)
            ->get(['id', 'titre_fr', 'type', 'date_limite', 'date_publication', 'is_published']);

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'articles' => Article::count(),
                'articles_published' => Article::where('is_published', true)->count(),
                'etablissements' => Etablissement::count(),
                'reclamations' => Reclamation::count(),
                'reclamations_pending' => Reclamation::where('statut', 'en_attente')->count(),
                'reclamations_in_progress' => Reclamation::where('statut', 'en_cours')->count(),
                'reclamations_resolved' => Reclamation::where('statut', 'resolu')->count(),
                'contacts_non_lus' => Contact::where('lu', false)->count(),
                'contacts_total' => Contact::count(),
                'appels_offres' => AppelOffre::count(),
                'prevention_topics' => PreventionTopic::count(),
                'users' => User::count(),
            ],
            'recentArticles' => $recentArticles,
            'recentReclamations' => $recentReclamations,
            'recentContacts' => $recentContacts,
            'recentTenders' => $recentTenders,
        ]);
    }

    public function articles()
    {
        $articles = Article::latest()->paginate(20);
        return Inertia::render('Admin/Articles', ['articles' => $articles]);
    }

    public function etablissements()
    {
        $etablissements = Etablissement::latest()->paginate(20);
        return Inertia::render('Admin/Etablissements', ['etablissements' => $etablissements]);
    }

    public function reclamations()
    {
        $reclamations = Reclamation::latest()->paginate(20);
        return Inertia::render('Admin/Reclamations', ['reclamations' => $reclamations]);
    }

    public function contacts()
    {
        $contacts = Contact::latest()->paginate(20);
        return Inertia::render('Admin/Contacts', ['contacts' => $contacts]);
    }
}
