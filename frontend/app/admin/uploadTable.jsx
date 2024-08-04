import { Table, FileInput, Label, Button } from "flowbite-react";

export default function UploadTable() {
	return (
		<div className="overflow-x-auto">
			<Table hoverable>
				<Table.Head>
					<Table.HeadCell>Các đề mục</Table.HeadCell>
					<Table.HeadCell>
						<span className="sr-only">Tải file lên</span>
					</Table.HeadCell>
					<Table.HeadCell></Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y">
					<Table.Row className="bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
						<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
							Trường ĐHCT
						</Table.Cell>
						<Table.Cell>
							<div>
								<div className="mb-2 block">
									<Label htmlFor="file-upload-dhct" value="Upload file" />
								</div>
								<FileInput id="file-upload-dhct" />
							</div>
						</Table.Cell>
						<Table.Cell>
							<Button>Huấn luyện</Button>
						</Table.Cell>
					</Table.Row>
					<Table.Row className="bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
						<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
							Trường CNTT&TT
						</Table.Cell>
						<Table.Cell>
							<div>
								<div className="mb-2 block">
									<Label htmlFor="file-upload-cntt" value="Upload file" />
								</div>
								<FileInput id="file-upload-cntt" />
							</div>
						</Table.Cell>
						<Table.Cell>
							<Button>Huấn luyện</Button>
						</Table.Cell>
					</Table.Row>
					<Table.Row className="bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
						<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
							Trường Kinh Tế
						</Table.Cell>
						<Table.Cell>
							<div>
								<div className="mb-2 block">
									<Label htmlFor="file-upload-kt" value="Upload file" />
								</div>
								<FileInput id="file-upload-kt" />
							</div>
						</Table.Cell>
						<Table.Cell>
							<Button>Huấn luyện</Button>
						</Table.Cell>
					</Table.Row>
					<Table.Row className="bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
						<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
							Trường Nông nghiệp
						</Table.Cell>
						<Table.Cell>
							<div>
								<div className="mb-2 block">
									<Label htmlFor="file-upload-nn" value="Upload file" />
								</div>
								<FileInput id="file-upload-nn" />
							</div>
						</Table.Cell>
						<Table.Cell>
							<Button>Huấn luyện</Button>
						</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
		</div>
	);
}
