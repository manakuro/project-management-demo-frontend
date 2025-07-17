package taskacivityrepository

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *taskActivityRepository) Create(ctx context.Context, input model.CreateTaskActivityInput) (*model.TaskActivity, error) {
	res, err := r.client.
		TaskActivity.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
