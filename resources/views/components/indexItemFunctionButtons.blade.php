<div class="btn-group">
    @if (session('g_mod') == 'Y')
        <i class="fas fa-edit" onclick="setKey('{{ isset($id) ? $id : $data->id }}');doAction('edit');"></i>
    @endif

    @if (session('g_del') == 'Y')
        <i class="fas fa-trash-alt" onclick="setKey('{{ isset($id) ? $id : $data->id }}');" id="sa-warning"></i>
    @endif
</div>
