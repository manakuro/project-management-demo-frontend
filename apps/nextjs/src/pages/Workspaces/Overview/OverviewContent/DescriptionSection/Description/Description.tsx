import { Flex } from '@/components/ui/atoms';
import { Editor, EditorContent } from '@/components/ui/organisms/Editor';
import {
  parseDescription,
  stringifyDescription,
} from '@/shared/prosemirror/convertDescription';
import { useProject, useProjectCommand } from '@/store/entities/project';
import isEqual from 'lodash-es/isEqual';
import type React from 'react';
import { memo, useCallback, useMemo } from 'react';
import { Container } from './Container';
import { Placeholder } from './Placeholder';
import { Provider } from './Provider';
import { ToolBar } from './ToolBar';

type Props = {
  projectId: string;
};

export const Description: React.FC<Props> = memo((props) => {
  return (
    <Provider>
      <DescriptionHandler {...props} />
    </Provider>
  );
});

const DescriptionHandler: React.FC<Props> = memo<Props>((props) => {
  const { projectId } = props;
  const { project } = useProject(projectId);
  const { setProject } = useProjectCommand();
  const initialValue = useMemo(
    () => stringifyDescription(project.description),
    [project.description],
  );

  const handleChange = useCallback(
    async (val: string) => {
      const description = parseDescription(val);
      if (isEqual(description, project.description)) return;

      await setProject({ description, projectId });
    },
    [project.description, setProject, projectId],
  );

  return <Component onChange={handleChange} initialValue={initialValue} />;
});

type ComponentProps = {
  onChange: (val: string) => void;
  initialValue: string;
};
const Component: React.FC<ComponentProps> = memo<ComponentProps>((props) => {
  const { onChange, initialValue } = props;

  const handleChange = useCallback(
    (val: string) => {
      console.log('change!');
      onChange(val);
    },
    [onChange],
  );

  return (
    <Container>
      <Editor onChange={handleChange} initialValue={initialValue}>
        <Flex flex={1} flexDirection="column">
          <EditorContent style={{ minHeight: '80px' }} />
          <Placeholder />
        </Flex>
        <ToolBar />
      </Editor>
    </Container>
  );
});
DescriptionHandler.displayName = 'DescriptionHandler';
Component.displayName = 'Component';
Description.displayName = 'Description';
