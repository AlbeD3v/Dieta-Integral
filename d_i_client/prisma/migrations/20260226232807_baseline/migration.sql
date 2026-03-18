-- CreateIndex
CREATE INDEX `Article_status_publicationDate_idx` ON `Article`(`status`, `publicationDate`);

-- RenameIndex
ALTER TABLE `Article` RENAME INDEX `Article_categoryId_fkey` TO `Article_categoryId_idx`;
