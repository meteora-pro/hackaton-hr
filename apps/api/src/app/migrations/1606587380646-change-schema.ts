import {MigrationInterface, QueryRunner} from "typeorm";

export class changeSchema1606587380646 implements MigrationInterface {
    name = 'changeSchema1606587380646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
CREATE extension IF NOT EXISTS pg_trgm;
CREATE INDEX trgm_candidates_title_idx ON candidates USING GIST(title gist_trgm_ops);
CREATE INDEX trgm_vacancy_name_idx ON candidates USING GIST(title gist_trgm_ops);

DROP FUNCTION IF EXISTS anyarray_diff_uniq(anyarray, anyarray);
CREATE OR REPLACE FUNCTION anyarray_diff_uniq(with_array anyarray, against_array anyarray)
    RETURNS anyarray AS
$BODY$
DECLARE
    -- The variable used to track iteration over "with_array".
    loop_offset integer;

    -- The array to be returned by this function.
    return_array with_array%TYPE := '{}';
BEGIN
    IF with_array IS NULL THEN
        RETURN against_array;
    ELSEIF against_array IS NULL THEN
        RETURN with_array;
    END IF;

    -- Iterate over with_array.
    FOR loop_offset IN ARRAY_LOWER(with_array, 1)..ARRAY_UPPER(with_array, 1) LOOP
            RAISE NOTICE '% %', with_array[loop_offset], return_array;
            IF (NOT with_array[loop_offset] = ANY(against_array)) AND (NOT with_array[loop_offset] = ANY(return_array)) THEN
                return_array = ARRAY_APPEND(return_array, with_array[loop_offset]);
            END IF;
        END LOOP;

    -- Iterate over against_array.
    FOR loop_offset IN ARRAY_LOWER(against_array, 1)..ARRAY_UPPER(against_array, 1) LOOP
            RAISE NOTICE '% %', against_array[loop_offset], return_array;
            IF (NOT against_array[loop_offset] = ANY(with_array)) AND (NOT against_array[loop_offset] = ANY(return_array)) THEN
                return_array = ARRAY_APPEND(return_array, against_array[loop_offset]);
            END IF;
        END LOOP;

    RETURN return_array;
END;
$BODY$ LANGUAGE plpgsql;


DROP FUNCTION IF EXISTS anyarray_remove(anyarray, anyarray);
CREATE OR REPLACE FUNCTION anyarray_remove(from_array anyarray, remove_array anyarray)
    RETURNS anyarray AS
$BODY$
DECLARE
    -- The variable used to track iteration over "from_array".
    loop_offset integer;


    -- The array to be returned by this function.
    return_array from_array%TYPE := '{}';
BEGIN
    -- If either argument is NULL, there is nothing to do.
    IF from_array IS NULL OR remove_array IS NULL THEN
        RETURN from_array;
    END IF;

    -- Iterate over each element in "from_array".
    FOR loop_offset IN ARRAY_LOWER(from_array, 1)..ARRAY_UPPER(from_array, 1) LOOP
        -- If the element being iterated over is in "remove_array",
        -- do not append it to "return_array".
            IF (from_array[loop_offset] = ANY(remove_array)) IS DISTINCT FROM TRUE THEN
                return_array = ARRAY_APPEND(return_array, from_array[loop_offset]);
            END IF;
        END LOOP;


    RETURN return_array;
END;
$BODY$ LANGUAGE plpgsql;


DROP FUNCTION IF EXISTS anyarray_remove(anyarray, anynonarray);
CREATE OR REPLACE FUNCTION anyarray_remove(from_array anyarray, remove_element anynonarray)
    RETURNS anyarray AS
$BODY$
BEGIN
    RETURN ANYARRAY_REMOVE(from_array, ARRAY[remove_element]);
END;
$BODY$ LANGUAGE plpgsql;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
