<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reclamation extends Model
{
    protected $fillable = [
        'nom', 'email', 'telephone', 'message', 'type',
        'statut', 'numero_suivi', 'reponse',
    ];
}
