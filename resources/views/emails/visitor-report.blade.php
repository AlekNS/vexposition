<div>
<h3>Hello, {{$company->name}}</h3>

Event "{{$event->name}}" had finished.<br>
Your booking stand {{ $stand->name }} visitors.<br>
<br>
<ol>
    @foreach($visitors as $index => $visitor)
    <li>{{ $visitor->name }} ({{ $visitor->email }}) - {{ $visitor->visited_at }}</li>
    @endforeach
</ol>
</div>
