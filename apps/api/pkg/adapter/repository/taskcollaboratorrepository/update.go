package taskcollaboratorrepository

import (
	"context"
	"project-management-demo-backend/ent"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *taskCollaboratorRepository) Update(ctx context.Context, input model.UpdateTaskCollaboratorInput) (*model.TaskCollaborator, error) {
	res, err := r.client.
		TaskCollaborator.UpdateOneID(input.ID).
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
