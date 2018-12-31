import ABS from "./ABS"
import ACOS from "./ACOS"
import ACOSH from "./ACOSH"
import ALERT from "./ALERT"
import ALTITUDE from "./ALTITUDE"
import AND from "./AND"
import APPLICATION from "./APPLICATION"
import APPLICATIONBUILD from "./APPLICATIONBUILD"
import APPLICATIONINFO from "./APPLICATIONINFO"
import APPLICATIONVERSION from "./APPLICATIONVERSION"
import ARRAY from "./ARRAY"
import AVERAGE from "./AVERAGE"
import CEILING from "./CEILING"
import CHAR from "./CHAR"
import CHOICEVALUE from "./CHOICEVALUE"
import CHOICEVALUES from "./CHOICEVALUES"
import CLEAN from "./CLEAN"
import COALESCE from "./COALESCE"
import CODE from "./CODE"
import COMPACT from "./COMPACT"
import CONCAT from "./CONCAT"
import CONCATENATE from "./CONCATENATE"
import { CONFIG, RESETCONFIG } from "./CONFIG"
import CONFIGURE from "./CONFIGURE"
import CONFIRM from "./CONFIRM"
import CONTAINS from "./CONTAINS"
import COS from "./COS"
import COSH from "./COSH"
import COUNT from "./COUNT"
import COUNTA from "./COUNTA"
import COUNTBLANK from "./COUNTBLANK"
import COUNTRY from "./COUNTRY"
import CURRENCYCODE from "./CURRENCYCODE"
import CURRENCYSYMBOL from "./CURRENCYSYMBOL"
import CURRENTLOCATION from "./CURRENTLOCATION"
import DATANAMES from "./DATANAMES"
import DATE from "./DATE"
import DATEVALUE from "./DATEVALUE"
import DAY from "./DAY"
import DECIMALSEPARATOR from "./DECIMALSEPARATOR"
import DEGREES from "./DEGREES"
import DESCRIPTION from "./DESCRIPTION"
import DEVICEINFO from "./DEVICEINFO"
import DEVICEMANUFACTURER from "./DEVICEMANUFACTURER"
import DEVICEMODEL from "./DEVICEMODEL"
import EMAIL from "./EMAIL"
import ERROR from "./ERROR"
import EVEN from "./EVEN"
import EXACT from "./EXACT"
import EXISTS from "./EXISTS"
import EXP from "./EXP"
import FACT from "./FACT"
import FACTDOUBLE from "./FACTDOUBLE"
import FALSE from "./FALSE"
import FIELD from "./FIELD"
import FIELDNAMES from "./FIELDNAMES"
import FIELDS from "./FIELDS"
import FIELDTYPE from "./FIELDTYPE"
import FIRST from "./FIRST"
import FIXED from "./FIXED"
import FLATTEN from "./FLATTEN"
import FLOOR from "./FLOOR"
import FORM from "./FORM"
import FORMAT from "./FORMAT"
import FORMATADDRESS from "./FORMATADDRESS"
import FORMATNUMBER from "./FORMATNUMBER"
import GCD from "./GCD"
import GETRESULT from "./GETRESULT"
import GROUP from "./GROUP"
import GROUPINGSEPARATOR from "./GROUPINGSEPARATOR"
import GROUPINGSIZE from "./GROUPINGSIZE"
import HASOTHER from "./HASOTHER"
import IF from "./IF"
import IFERROR from "./IFERROR"
import INSPECT from "./INSPECT"
import INT from "./INT"
import INVALID from "./INVALID"
import ISBLANK from "./ISBLANK"
import ISERR from "./ISERR"
import ISERROR from "./ISERROR"
import ISEVEN from "./ISEVEN"
import ISLANDSCAPE from "./ISLANDSCAPE"
import ISLOGICAL from "./ISLOGICAL"
import ISNAN from "./ISNAN"
import ISNEW from "./ISNEW"
import ISNONTEXT from "./ISNONTEXT"
import ISNUMBER from "./ISNUMBER"
import ISODD from "./ISODD"
import ISPORTRAIT from "./ISPORTRAIT"
import ISROLE from "./ISROLE"
import ISSELECTED from "./ISSELECTED"
import ISTEXT from "./ISTEXT"
import ISUPDATE from "./ISUPDATE"
import LABEL from "./LABEL"
import LANGUAGE from "./LANGUAGE"
import LAST from "./LAST"
import LATITUDE from "./LATITUDE"
import LCM from "./LCM"
import LEFT from "./LEFT"
import LEN from "./LEN"
import LN from "./LN"
import LOCALE from "./LOCALE"
import LOG from "./LOG"
import LOG10 from "./LOG10"
import LONGITUDE from "./LONGITUDE"
import LOWER from "./LOWER"
import LPAD from "./LPAD"
import MAX from "./MAX"
import MAXA from "./MAXA"
import MEDIAN from "./MEDIAN"
import MEMOIZED_FACT from "./MEMOIZED_FACT"
import MEMOIZED_FACTDOUBLE from "./MEMOIZED_FACTDOUBLE"
import MESSAGEBOX from "./MESSAGEBOX"
import MID from "./MID"
import MIN from "./MIN"
import MINA from "./MINA"
import MOD from "./MOD"
import MONTH from "./MONTH"
import N from "./N"
import NOT from "./NOT"
import NUM from "./NUM"
import NUMS from "./NUMS"
import ODD from "./ODD"
import OFF from "./OFF"
import ON from "./ON"
import PI from "./PI"
import PLATFORM from "./PLATFORM"
import PLATFORMINFO from "./PLATFORMINFO"
import PLATFORMVERSION from "./PLATFORMVERSION"
import PLUCK from "./PLUCK"
import POWER from "./POWER"
import PRECISION from "./PRECISION"
import PRODUCT from "./PRODUCT"
import PROGRESS from "./PROGRESS"
import PROJECTID from "./PROJECTID"
import PROJECTNAME from "./PROJECTNAME"
import PROMPT from "./PROMPT"
import PROPER from "./PROPER"
import QUOTIENT from "./QUOTIENT"
import RADIANS from "./RADIANS"
import RAND from "./RAND"
import RANDBETWEEN from "./RANDBETWEEN"
import RECORDID from "./RECORDID"
import REPEATABLEID from "./REPEATABLEID"
import REPEATABLENUMBER from "./REPEATABLENUMBER"
import REPEATABLESUM from "./REPEATABLESUM"
import REPEATABLEVALUES from "./REPEATABLEVALUES"
import RIGHT from "./RIGHT"
import ROLE from "./ROLE"
import ROUND from "./ROUND"
import REQUEST from "./REQUEST"
import SETTIMEOUT from "./SETTIMEOUT"
import SETCONFIGURATION from "./SETCONFIGURATION"
import SETVALUE from "./SETVALUE"
import STORAGE from "./STORAGE"
import SUM from "./SUM"
import SUMSQ from "./SUMSQ"
import T from "./T"
import TIMEADD from "./TIMEADD"
import TIMEDIFF from "./TIMEDIFF"
import TIMESTAMP from "./TIMESTAMP"
import TIMEZONE from "./TIMEZONE"
import TRIM from "./TRIM"
import TRUE from "./TRUE"
import TYPEOF from "./TYPEOF"
import UNIQUE from "./UNIQUE"
import UPPER from "./UPPER"
import USERFULLNAME from "./USERFULLNAME"
import VALUE from "./VALUE"
import VERSIONINFO from "./VERSIONINFO"
import YEAR from "./YEAR"

RESETCONFIG()

export interface FunctionMap {
  [functionName: string]: Function|undefined
}

export const functions: FunctionMap = {
  ABS,
  ACOS,
  ACOSH,
  ALERT,
  ALTITUDE,
  AND,
  APPLICATION,
  APPLICATIONBUILD,
  APPLICATIONINFO,
  APPLICATIONVERSION,
  ARRAY,
  AVERAGE,
  CEILING,
  CHAR,
  CHOICEVALUE,
  CHOICEVALUES,
  CLEAN,
  COALESCE,
  CODE,
  COMPACT,
  CONCAT,
  CONCATENATE,
  CONFIG,
  CONFIGURE,
  CONFIRM,
  CONTAINS,
  COS,
  COSH,
  COUNT,
  COUNTA,
  COUNTBLANK,
  COUNTRY,
  CURRENCYCODE,
  CURRENCYSYMBOL,
  CURRENTLOCATION,
  DATANAMES,
  DATE,
  DATEVALUE,
  DAY,
  DECIMALSEPARATOR,
  DEGREES,
  DESCRIPTION,
  DEVICEINFO,
  DEVICEMANUFACTURER,
  DEVICEMODEL,
  EMAIL,
  ERROR,
  EVEN,
  EXACT,
  EXISTS,
  EXP,
  FACT,
  FACTDOUBLE,
  FALSE,
  FIELD,
  FIELDNAMES,
  FIELDS,
  FIELDTYPE,
  FIRST,
  FIXED,
  FLATTEN,
  FLOOR,
  FORM,
  FORMAT,
  FORMATADDRESS,
  FORMATNUMBER,
  GCD,
  GETRESULT,
  GROUP,
  GROUPINGSEPARATOR,
  GROUPINGSIZE,
  HASOTHER,
  IF,
  IFERROR,
  INSPECT,
  INT,
  INVALID,
  ISBLANK,
  ISERR,
  ISERROR,
  ISEVEN,
  ISLANDSCAPE,
  ISLOGICAL,
  ISNAN,
  ISNEW,
  ISNONTEXT,
  ISNUMBER,
  ISODD,
  ISPORTRAIT,
  ISROLE,
  ISSELECTED,
  ISTEXT,
  ISUPDATE,
  LABEL,
  LANGUAGE,
  LAST,
  LATITUDE,
  LCM,
  LEFT,
  LEN,
  LN,
  LOCALE,
  LOG,
  LOG10,
  LONGITUDE,
  LOWER,
  LPAD,
  MAX,
  MAXA,
  MEDIAN,
  MEMOIZED_FACT,
  MEMOIZED_FACTDOUBLE,
  MESSAGEBOX,
  MID,
  MIN,
  MINA,
  MOD,
  MONTH,
  N,
  NO_VALUE: undefined,
  NOT,
  NUM,
  NUMS,
  ODD,
  OFF,
  ON,
  PI,
  PLATFORM,
  PLATFORMINFO,
  PLATFORMVERSION,
  PLUCK,
  POWER,
  PRECISION,
  PRODUCT,
  PROGRESS,
  PROJECTID,
  PROJECTNAME,
  PROMPT,
  PROPER,
  QUOTIENT,
  RADIANS,
  RAND,
  RANDBETWEEN,
  RECORDID,
  REPEATABLEID,
  REPEATABLENUMBER,
  REPEATABLESUM,
  REPEATABLEVALUES,
  REQUEST,
  RESETCONFIG,
  RIGHT,
  ROLE,
  ROUND,
  SETCONFIGURATION,
  SETTIMEOUT,
  SETVALUE,
  STORAGE,
  SUM,
  SUMSQ,
  T,
  TIMEADD,
  TIMEDIFF,
  TIMESTAMP,
  TIMEZONE,
  TRIM,
  TRUE,
  TYPEOF,
  UNIQUE,
  UPPER,
  USERFULLNAME,
  VALUE,
  VERSIONINFO,
  YEAR,
}
