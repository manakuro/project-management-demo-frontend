package tasklikerepository

import (
	"context"
	"project-management-demo-backend/ent"
	"project-management-demo-backend/ent/tasklike"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *taskLikeRepository) Delete(ctx context.Context, input model.DeleteTaskLikeInput) (*model.TaskLike, error) {
	deleted, err := r.client.TaskLike.Query().Where(tasklike.IDEQ(input.ID)).Only(ctx)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, input.ID)
		}
		return nil, model.NewDBError(err)
	}

	err = r.client.TaskLike.DeleteOneID(input.ID).Exec(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return deleted, nil
}
