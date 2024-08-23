import pymysql.cursors
import click
from flask import current_app
from flask import g


def get_db():
    """Connect to the application's configured database. The connection
    is unique for each request and will be reused if this is called
    again.
    """
    if "db" not in g:
        g.db = pymysql.connect(host=current_app.config['DB_HOST'],
                               port=current_app.config['DB_PORT'],
                               user=current_app.config['DB_USER'],
                               password=current_app.config['DB_PASSWORD'],
                               database=current_app.config['DATABASE'],
                               cursorclass=pymysql.cursors.DictCursor)

    print('get_db 들어옴')

    return g.db


def close_db(e=None):
    """If this request connected to the database, close the
    connection.
    """
    db = g.pop("db", None)

    if db is not None:
        print('닫음')
        db.close()


def init_db():
    """Clear existing data and create new tables."""
    db = get_db()

    #with current_app.open_resource("schema.sql") as f:
    #    db.executescript(f.read().decode("utf8"))


@click.command("init-db")
def init_db_command():
    """Clear existing data and create new tables."""
    init_db()
    click.echo("Initialized the database.")


def init_app(app):
    """Register database functions with the Flask app. This is called by
    the application factory.
    """
    print('init_app 들어옴')
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)