<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PreventionTopic extends Model
{
    protected $fillable = [
        'titre_fr', 'titre_ar', 'contenu_fr', 'contenu_ar',
        'slug', 'image', 'categorie', 'is_published',
    ];

    protected function casts(): array
    {
        return ['is_published' => 'boolean'];
    }
}
