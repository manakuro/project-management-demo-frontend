package tasklikerepository

import (
	"context"
	"project-management-demo-backend/ent"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *taskLikeRepository) Update(ctx context.Context, input model.UpdateTaskLikeInput) (*model.TaskLike, error) {
	res, err := r.client.
		TaskLike.UpdateOneID(input.ID).
		SetInput(input).
		Save(ctx)

	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, input.ID)
		}

		return nil, model.NewDBError(err)
	}

	return res, nil
}
