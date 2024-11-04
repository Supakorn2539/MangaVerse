import React from 'react';
import useMangaStore from '../../zustand/manga-store';
import ItemManga from './ItemManga'; 

const ListManga = () => {
  const mangas = useMangaStore((state) => state.mangas);

  return (
    <div>
      {mangas?.map((manga) => (
        <ItemManga key={manga.id} el={manga} />
      ))}
    </div>
  );
};

export default ListManga;
