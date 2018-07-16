<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ResetPasswordController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function reset() {
        $email = request(['email']);

        if(!$this->validateEmail($email)) {
            return $this->failedResponse();
        }

        $this->sendEmail($email);

        return $this->successResponse();
    }

    protected function validateEmail($email) {
        return !!User::where('email', $email)->first();
    }

    protected function sendEmail($email) {
       //
    }

    protected function failedResponse() {
        return response()->json([
            'error' => 'Email does not exist'
        ], Response::HTTP_NOT_FOUND);
    }

    protected function successResponse() {
        return response()->json([
            'data' => 'Email was sent'
        ], Response::HTTP_OK);
    }
}
