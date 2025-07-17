package teammatetaskrepository

import (
	"context"
	"project-management-demo-backend/ent"
	"project-management-demo-backend/ent/teammatetask"
	"project-management-demo-backend/pkg/adapter/repository/repositoryutil"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *teammateTaskRepository) Delete(ctx context.Context, input model.DeleteTeammateTaskInput) (*model.TeammateTask, error) {
	client := repositoryutil.WithTransactionalMutation(ctx)

	deleted, err := client.
		TeammateTask.Query().
		WithTask().
		Where(teammatetask.IDEQ(input.ID)).
		Only(ctx)

	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, input.ID)
		}
		return nil, model.NewDBError(err)
	}

	err = client.TeammateTask.DeleteOneID(input.ID).Exec(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return deleted, nil
}
