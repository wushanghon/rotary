<?php

namespace App\Repository\Admin\Chiliman;

use App\Models\Chiliman\code_c;
use Illuminate\Support\Facades\DB;
use Libraries\Chiliman\BackendRepositoryMutiAbstract;

class CodeCRepository extends BackendRepositoryMutiAbstract
{
    public function __construct()
    {
        $this->setEntity(code_c::class);
        $this->setKeys(['code_type', 'code_id']);
        $this->orderBy('code_type');
        $this->orderBy('code_sort');
        $this->setNumberOfRow(10);
    }

    public function queryCodeType()
    {
        $data = DB::table('code_c')
            ->select('code_type', 'code_type_desc')
            ->groupBy('code_type', 'code_type_desc')
            ->orderBy('code_type')
            ->get();

        return $data;
    }

    public function queryByCodeType($code_type, $code_dsp = 'Y', $exclude = null)
    {
        if (isset($exclude)) {
            //把陣列的所有值用,格開，然後組在一起

            $data = DB::table('code_c')
                ->where('code_type', $code_type)
                ->where('code_dsp', $code_dsp)
                ->whereNotIn("code_id", $exclude)->get();
        } else {
            $data = DB::table('code_c')
                ->where('code_type', $code_type)
                ->where('code_dsp', $code_dsp)
                ->orderBy('code_sort')
                ->get();
        }

        return $data;
    }
}
