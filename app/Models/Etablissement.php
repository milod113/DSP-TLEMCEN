<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Etablissement extends Model
{
    protected $fillable = [
        'nom_fr', 'nom_ar', 'type', 'adresse_fr', 'adresse_ar',
        'telephone', 'email', 'specialites_fr', 'specialites_ar',
        'horaires', 'latitude', 'longitude', 'responsable', 'is_active',
    ];

    protected function casts(): array
    {
        return ['is_active' => 'boolean'];
    }
}
