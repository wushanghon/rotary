<?php

namespace App\Models\Chiliman;

use App\Repository\Admin\Chiliman\LogRepository;
use App\Service\Admin\Chiliman\LogService;
use Illuminate\Database\Eloquent\Model as BaseModel;

class ModelWithLog extends BaseModel
{

    /**
     * override BaseModel
     * Save the model to the database.
     *
     * @param  array  $options
     * @return bool
     */
    public function save(array $options = [])
    {
        $logService = new LogService(new LogRepository());

        $query = $this->newModelQuery();

        // If the "saving" event returns false we'll bail out of the save and return
        // false, indicating that the save failed. This provides a chance for any
        // listeners to cancel save operations if validations fail or whatever.
        if ($this->fireModelEvent('saving') === false) {
            return false;
        }

        // If the model already exists in the database we can just update our record
        // that is already in this database using the current IDs in this "where"
        // clause to only update this model. Otherwise, we'll just insert them.
        if ($this->exists) {
            $saved = $this->isDirty() ?
                $this->performUpdate($query) : true;

//            print_r('<br>-------<br>');
//
//            print_r($this->getAttributes());
//            print_r('<br><br>');
//            print_r($this->getOriginal());
//            print_r('<br><br>');
//            print_r($this->getChanges());
//            print_r('<br><br>');
//
//            print_r('<br>-------<br>');
            //寫入LOG
            $logService->storeAutoLog($this,$this->getOriginal(),'modify');

        }

        // If the model is brand new, we'll insert it into our database and set the
        // ID attribute on the model to the value of the newly inserted row's ID
        // which is typically an auto-increment value managed by the database.
        else {
            $saved = $this->performInsert($query);

            //寫入LOG
            $logService->storeAutoLog($this,$this->getOriginal(),'add');

            if (! $this->getConnectionName() &&
                $connection = $query->getConnection()) {
                $this->setConnection($connection->getName());
            }
        }

        // If the model is successfully saved, we need to do a few more things once
        // that is done. We will call the "saved" method here to run any actions
        // we need to happen after a model gets successfully saved right here.
        if ($saved) {
            $this->finishSave($options);
        }

        return $saved;
    }


    /**
     * override BaseModel
     * Destroy the models for the given IDs.
     *
     * @param  array|int  $ids
     * @return int
     */

    public static function destroy($ids)
    {
        $logService = new LogService(new LogRepository());

        // We'll initialize a count here so we will return the total number of deletes
        // for the operation. The developers can then check this number as a boolean
        // type value or get this total count of records deleted for logging, etc.
        $count = 0;

        $ids = is_array($ids) ? $ids : func_get_args();

        // We will actually pull the models from the database table and call delete on
        // each of them individually so that their events get fired properly with a
        // correct set of attributes in case the developers wants to check these.
        $key = ($instance = new static)->getKeyName();

        foreach ($instance->whereIn($key, $ids)->get() as $model) {
            if ($model->delete()) {

                //寫入LOG
                $logService->storeAutoLog($model,$model->getOriginal(),'del');

                $count++;
            }
        }

        return $count;
    }

}
