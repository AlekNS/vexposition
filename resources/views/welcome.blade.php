@extends('layouts.app')

@section('content')
<div class="view-animate-container">
    <div data-ng-view class="view-animate">
        <h2 class="well text-center">... application is loading ...</h2>
        <div class="text-center"><img src="/images/hourglass.svg" style="margin-top:5%"></div>
    </div>
</div>
@endsection
