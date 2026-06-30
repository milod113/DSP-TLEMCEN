<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppelOffre extends Model
{
    protected $table = 'appels_offres';

    protected $fillable = [
        'titre_fr', 'titre_ar', 'description_fr', 'description_ar',
        'type', 'fichier', 'date_limite', 'date_publication', 'is_published',
    ];

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
            'date_limite' => 'date',
            'date_publication' => 'date',
        ];
    }
}
