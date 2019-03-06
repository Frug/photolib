package photos

import "database/sql"

type Photo struct {
	Id    int64  `json:"id,omitempty"`
	Url   string `json:"url"`
	Title string `json:"title"`
}

type Photos struct {
	Photos []Photo `json:"photos"`
	Page   int     `json:"page"`
	Total  int     `json:"total"`
}

func DeletePhoto(id int) (err error) {
	stmt, err := getDB().Prepare("DELETE FROM photos WHERE ROWID = ?")
	if err != nil {
		return err
	}

	_, err = stmt.Exec(id)

	return err
}

func DeletePhotos() (err error) {
	stmt, err := getDB().Prepare("DELETE FROM photos")
	if err != nil {
		return err
	}

	_, err = stmt.Exec()

	return err
}

func PostPhoto(p *Photo) (err error) {
	stmt, err := getDB().Prepare("INSERT INTO photos(url, title) values(?,?)")
	if err != nil {
		return err
	}

	res, err := stmt.Exec(p.Url, p.Title)
	if err != nil {
		return err
	}

	p.Id, err = res.LastInsertId()
	if err != nil {
		return err
	}

	return nil
}

func getDB() (db *sql.DB) {
	db, err := sql.Open("sqlite3", "./photos.sqlite")
	checkErr(err)

	return db
}

func GetPhotos(page int) (photos Photos, err error) {
	perPage := 10
	offset := page * perPage
	query := "SELECT ROWID, url, title FROM photos LIMIT ? OFFSET ?"
	rows, err := getDB().Query(query, perPage, offset)
	if err != nil {
		return photos, err
	}

	photos.Page = page
	for rows.Next() {
		photo := Photo{}
		if err := rows.Scan(&photo.Id, &photo.Url, &photo.Title); err != nil {
			return photos, err
		}
		photos.Photos = append(photos.Photos, photo)
	}
	checkErr(err)

	row := getDB().QueryRow("SELECT COUNT(*) FROM photos")
	if err := row.Scan(&photos.Total); err != nil {
		return photos, err
	}

	return photos, nil
}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}
