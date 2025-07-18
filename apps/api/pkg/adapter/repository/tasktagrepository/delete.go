package tasktagrepository

import (
	"context"
	"project-management-demo-backend/ent"
	"project-management-demo-backend/ent/tasktag"
	"project-management-demo-backend/pkg/adapter/repository/repositoryutil"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *taskTagRepository) Delete(ctx context.Context, input model.DeleteTaskTagInput) (*model.TaskTag, error) {
	client := repositoryutil.WithTransactionalMutation(ctx)

	deleted, err := client.TaskTag.Query().WithTag(func(tq *ent.TagQuery) {
		repositoryutil.WithTag(tq)
	}).Where(tasktag.IDEQ(input.ID)).Only(ctx)

	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, input.ID)
		}
		return nil, model.NewDBError(err)
	}

	err = client.TaskTag.DeleteOneID(input.ID).Exec(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return deleted, nil
}
