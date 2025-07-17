package archivedtaskacivityrepository

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *archivedTaskActivityRepository) Create(ctx context.Context, input model.CreateArchivedTaskActivityInput) (*model.ArchivedTaskActivity, error) {
	res, err := r.client.
		ArchivedTaskActivity.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
