// Please update this type as same as with the data shape.
type File = {
  id: string;
  name: string;
};

type Folder = {
  id: string;
  name: string;
  files: File[];
};

type List = Folder[];

export default function move(list: List, source: string, destination: string): List {
  // find destination folder
  const destinationFolder: Folder | undefined = list.find(
    (folder: Folder) => folder.id === destination,
  );

  if (destinationFolder === undefined) {
    // throw an error if the destination folder doesn't exist
    throw new Error('You cannot specify a file as the destination');
  }

  // find source folder and file index
  let sourceFileIndex = 0;
  const sourceFolder: Folder | undefined = list.find((folder: Folder) =>
    folder.files.some((file: File, index: number) => {
      sourceFileIndex = index;
      return file.id === source;
    }),
  );
  if (sourceFolder === undefined) {
    // throw an error if the source file doesn't exist
    throw new Error('You cannot move a folder');
  }

  // remove  file from source folder
  const [removedFile] = sourceFolder.files.splice(sourceFileIndex, 1);

  // add file to destination folder
  destinationFolder.files.push(removedFile);

  return list;
}
