<?php

use App\Http\Controllers\Admin\AppelOffreController;
use App\Http\Controllers\Admin\ArticleController as AdminArticleController;
use App\Http\Controllers\Admin\ContactController as AdminContactController;
use App\Http\Controllers\Admin\DocumentController as AdminDocumentController;
use App\Http\Controllers\Admin\EtablissementController as AdminEtablissementController;
use App\Http\Controllers\Admin\PreventionController as AdminPreventionController;
use App\Http\Controllers\Admin\ProfessionalNoteController as AdminProfessionalNoteController;
use App\Http\Controllers\Admin\FaqController as AdminFaqController;
use App\Http\Controllers\Admin\MediaController as AdminMediaController;
use App\Http\Controllers\Admin\PageContentController as AdminPageContentController;
use App\Http\Controllers\Admin\ReclamationController as AdminReclamationController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Api\ContactController as ApiContactController;
use App\Http\Controllers\Api\NewsletterController;
use App\Http\Controllers\Api\ReclamationController as ApiReclamationController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ActualiteController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DirectionController;
use App\Http\Controllers\EtablissementController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InfoController;
use App\Http\Controllers\LocaleController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\PreventionController;
use App\Http\Controllers\ProfessionnelController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;

// API routes
Route::post('/api/reclamations', [ApiReclamationController::class, 'store']);
Route::post('/api/contacts', [ApiContactController::class, 'store']);
Route::post('/api/newsletter', [NewsletterController::class, 'subscribe']);

// Auth
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');

// Public routes
Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/direction', [DirectionController::class, 'index'])->name('direction');
Route::get('/direction/mot-directeur', [DirectionController::class, 'motDirecteur'])->name('direction.mot');
Route::get('/direction/missions', [DirectionController::class, 'missions'])->name('direction.missions');
Route::get('/direction/organigramme', [DirectionController::class, 'organigramme'])->name('direction.organigramme');

Route::get('/etablissements', [EtablissementController::class, 'index'])->name('etablissements');
Route::get('/etablissements/{id}', [EtablissementController::class, 'show'])->name('etablissements.show');

Route::get('/actualites', [ActualiteController::class, 'index'])->name('actualites');
Route::get('/actualites/{slug}', [ActualiteController::class, 'show'])->name('actualites.show');

Route::get('/prevention', [PreventionController::class, 'index'])->name('prevention');
Route::get('/prevention/{slug}', [PreventionController::class, 'show'])->name('prevention.show');

Route::get('/services', [ServiceController::class, 'index'])->name('services');
Route::get('/services/reclamation', [ServiceController::class, 'reclamation'])->name('services.reclamation');
Route::get('/services/signalement', [ServiceController::class, 'signalement'])->name('services.signalement');
Route::get('/services/urgences', [ServiceController::class, 'urgences'])->name('services.urgences');
Route::get('/services/faq', [ServiceController::class, 'faq'])->name('services.faq');
Route::get('/services/rendez-vous', [ServiceController::class, 'rendezVous'])->name('services.rendezvous');
Route::get('/services/resultats', [ServiceController::class, 'resultats'])->name('services.resultats');
Route::get('/contact', [ServiceController::class, 'contact'])->name('contact');

Route::get('/professionnels', [ProfessionnelController::class, 'index'])->name('professionnels');
Route::get('/professionnels/{professionalNote}', [ProfessionnelController::class, 'show'])->name('professionnels.show');

Route::get('/appels-offres', [InfoController::class, 'appelsOffres'])->name('appels-offres');
Route::get('/appels-offres/{appelOffre}', [InfoController::class, 'showAppelOffre'])->name('appels-offres.show');
Route::get('/recrutements', [InfoController::class, 'recrutements'])->name('recrutements');
Route::get('/documents', [InfoController::class, 'documents'])->name('documents');

Route::get('/mediatheque', [MediaController::class, 'index'])->name('mediatheque');
Route::get('/mediatheque/{media}', [MediaController::class, 'show'])->name('mediatheque.show');
Route::get('/recherche', [SearchController::class, 'search'])->name('search');
Route::post('/locale/{locale}', [LocaleController::class, 'switch'])->name('locale.switch');

// Admin routes
Route::middleware('auth')->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');

    Route::get('/articles', [AdminArticleController::class, 'index'])->name('articles.index');
    Route::get('/articles/create', [AdminArticleController::class, 'create'])->name('articles.create');
    Route::post('/articles', [AdminArticleController::class, 'store'])->name('articles.store');
    Route::get('/articles/{article}/edit', [AdminArticleController::class, 'edit'])->name('articles.edit');
    Route::put('/articles/{article}', [AdminArticleController::class, 'update'])->name('articles.update');
    Route::delete('/articles/{article}', [AdminArticleController::class, 'destroy'])->name('articles.destroy');

    Route::get('/etablissements', [AdminEtablissementController::class, 'index'])->name('etablissements.index');
    Route::get('/etablissements/create', [AdminEtablissementController::class, 'create'])->name('etablissements.create');
    Route::post('/etablissements', [AdminEtablissementController::class, 'store'])->name('etablissements.store');
    Route::get('/etablissements/{etablissement}/edit', [AdminEtablissementController::class, 'edit'])->name('etablissements.edit');
    Route::put('/etablissements/{etablissement}', [AdminEtablissementController::class, 'update'])->name('etablissements.update');
    Route::delete('/etablissements/{etablissement}', [AdminEtablissementController::class, 'destroy'])->name('etablissements.destroy');

    Route::get('/documents', [AdminDocumentController::class, 'index'])->name('documents.index');
    Route::post('/documents', [AdminDocumentController::class, 'store'])->name('documents.store');
    Route::put('/documents/{document}', [AdminDocumentController::class, 'update'])->name('documents.update');
    Route::delete('/documents/{document}', [AdminDocumentController::class, 'destroy'])->name('documents.destroy');

    Route::get('/appels-offres', [AppelOffreController::class, 'index'])->name('appels-offres.index');
    Route::post('/appels-offres', [AppelOffreController::class, 'store'])->name('appels-offres.store');
    Route::put('/appels-offres/{appelOffre}', [AppelOffreController::class, 'update'])->name('appels-offres.update');
    Route::delete('/appels-offres/{appelOffre}', [AppelOffreController::class, 'destroy'])->name('appels-offres.destroy');

    Route::get('/prevention', [AdminPreventionController::class, 'index'])->name('prevention.index');
    Route::post('/prevention', [AdminPreventionController::class, 'store'])->name('prevention.store');
    Route::put('/prevention/{preventionTopic}', [AdminPreventionController::class, 'update'])->name('prevention.update');
    Route::delete('/prevention/{preventionTopic}', [AdminPreventionController::class, 'destroy'])->name('prevention.destroy');

    Route::get('/professionnels', [AdminProfessionalNoteController::class, 'index'])->name('professionnels.index');
    Route::post('/professionnels', [AdminProfessionalNoteController::class, 'store'])->name('professionnels.store');
    Route::put('/professionnels/{professionalNote}', [AdminProfessionalNoteController::class, 'update'])->name('professionnels.update');
    Route::delete('/professionnels/{professionalNote}', [AdminProfessionalNoteController::class, 'destroy'])->name('professionnels.destroy');

    Route::get('/reclamations', [AdminReclamationController::class, 'index'])->name('reclamations.index');
    Route::put('/reclamations/{reclamation}', [AdminReclamationController::class, 'update'])->name('reclamations.update');

    Route::get('/contacts', [AdminContactController::class, 'index'])->name('contacts.index');
    Route::put('/contacts/{contact}', [AdminContactController::class, 'update'])->name('contacts.update');

    Route::get('/page-contents', [AdminPageContentController::class, 'index'])->name('page-contents.index');
    Route::get('/page-contents/{pageContent}/edit', [AdminPageContentController::class, 'edit'])->name('page-contents.edit');
    Route::put('/page-contents/{pageContent}', [AdminPageContentController::class, 'update'])->name('page-contents.update');

    Route::get('/users', [AdminUserController::class, 'index'])->name('users.index');
    Route::get('/users/create', [AdminUserController::class, 'create'])->name('users.create');
    Route::post('/users', [AdminUserController::class, 'store'])->name('users.store');
    Route::get('/users/{user}/edit', [AdminUserController::class, 'edit'])->name('users.edit');
    Route::put('/users/{user}', [AdminUserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [AdminUserController::class, 'destroy'])->name('users.destroy');

    Route::get('/faqs', [AdminFaqController::class, 'index'])->name('faqs.index');
    Route::get('/faqs/create', [AdminFaqController::class, 'create'])->name('faqs.create');
    Route::post('/faqs', [AdminFaqController::class, 'store'])->name('faqs.store');
    Route::get('/faqs/{faq}/edit', [AdminFaqController::class, 'edit'])->name('faqs.edit');
    Route::put('/faqs/{faq}', [AdminFaqController::class, 'update'])->name('faqs.update');
    Route::delete('/faqs/{faq}', [AdminFaqController::class, 'destroy'])->name('faqs.destroy');

    Route::get('/media', [AdminMediaController::class, 'index'])->name('media.index');
    Route::post('/media', [AdminMediaController::class, 'store'])->name('media.store');
    Route::put('/media/{media}', [AdminMediaController::class, 'update'])->name('media.update');
    Route::delete('/media/{media}', [AdminMediaController::class, 'destroy'])->name('media.destroy');
});
