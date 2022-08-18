<!DOCTYPE html>
<html lang="en">
<head>
    <#include "partials/head.ftlh" />
    <title>Hello ${name!''}!</title>
    <script src="/js/script.js"></script>
</head>
<body>
    <div id="data" style="display:none;">${data ! ''}</div>
    
    <div class="container">
        <h2>Hello ${name!''}!</h2>
        <table id="myTable" class="table table-light table-hover table-striped table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>NAMA</th>
                <th>NO PENDAFTARAN</th>
                <th>NO SIJIL PELABURAN</th>
                <th>AMAUN POKOK</th>
                <th>KADAR FAEDAH (%)</th>
              </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
</body>
</html>