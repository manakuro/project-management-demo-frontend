package archivedtaskacivitytaskrepository

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *archivedArchivedTaskActivityTaskRepository) Create(ctx context.Context, input model.CreateArchivedTaskActivityTaskInput) (*model.ArchivedTaskActivityTask, error) {
	res, err := r.client.
		ArchivedTaskActivityTask.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
