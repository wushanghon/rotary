/*
 Template Name: Dashor - Responsive Bootstrap 4 Admin Dashboard
 Author: Themesdesign
 Website: www.themesdesign.in
 File: Datatable js
 */

$(document).ready(function() {
    $('#datatable').DataTable();

    //Buttons examples
    var table = $('#datatable-buttons').DataTable({
        lengthChange: true,
        searching: false,
        paging: false,
        ordering:  true
        //buttons: [ 'pdf','print', 'colvis']
        //buttons: ["copy", "excel", "csv", "pdf", "print", 'colvis']
    });

    table.buttons().container()
        .appendTo('#datatable-buttons_wrapper .col-md-6:eq(0)');

    $(document).ready(function() {
        $('#datatable2').DataTable();  
    } );
} );

