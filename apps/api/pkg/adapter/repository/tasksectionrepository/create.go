package tasksectionrepository

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *taskSectionRepository) Create(ctx context.Context, input model.CreateTaskSectionInput) (*model.TaskSection, error) {
	res, err := r.client.
		TaskSection.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
