package tasklistcompletedstatusrepository

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *taskListCompletedStatusRepository) Create(ctx context.Context, input model.CreateTaskListCompletedStatusInput) (*model.TaskListCompletedStatus, error) {
	res, err := r.client.
		TaskListCompletedStatus.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
